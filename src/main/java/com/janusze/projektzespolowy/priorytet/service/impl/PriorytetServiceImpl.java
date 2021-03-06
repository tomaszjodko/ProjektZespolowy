package com.janusze.projektzespolowy.priorytet.service.impl;

import com.janusze.projektzespolowy.priorytet.dto.PriorytetDTO;
import com.janusze.projektzespolowy.priorytet.ob.PriorytetOB;
import com.janusze.projektzespolowy.priorytet.repository.IPriorytetRepository;
import com.janusze.projektzespolowy.priorytet.service.IPriorytetService;
import com.janusze.projektzespolowy.util.converters.impl.PriorytetConverter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by Tomasz Jodko on 2016-04-22.
 */
@Service
@Transactional
public class PriorytetServiceImpl implements IPriorytetService {

    @Autowired
    IPriorytetRepository iPriorytetRepository;
    @Autowired
    PriorytetConverter priorytetConverter;

    @Override
    public PriorytetDTO findPriorytetById(Long aId) {
        PriorytetOB pPriorytetOB = iPriorytetRepository.findOne(aId);
        if (pPriorytetOB == null) {
            return null;
        }
        return priorytetConverter.mapOBtoDTO(pPriorytetOB);
    }

    @Override
    public List<PriorytetDTO> findAllPriorytety() {
        List<PriorytetDTO> pResult = new ArrayList<>();
        List<PriorytetOB> pPriorytetList = iPriorytetRepository.findAll();
        for (PriorytetOB priorytet : pPriorytetList) {
            pResult.add(priorytetConverter.mapOBtoDTO(priorytet));
        }
        return pResult;
    }

    @Override
    public PriorytetDTO savePriorytet(PriorytetDTO aPriorytetDTO) {
        if (aPriorytetDTO == null) {
            return null;
        }
        PriorytetOB pPriorytetOB = aPriorytetDTO.getId() == null ? null : iPriorytetRepository.findOne(aPriorytetDTO.getId());

        if (pPriorytetOB == null) {
            return priorytetConverter.mapOBtoDTO(iPriorytetRepository.save(priorytetConverter.mapDTOtoOB(aPriorytetDTO)));
        }
        pPriorytetOB.setTyp(aPriorytetDTO.getTyp());
        pPriorytetOB.setIlosc(aPriorytetDTO.getIlosc());
        pPriorytetOB.setJednostka(aPriorytetDTO.getJednostka());
        return priorytetConverter.mapOBtoDTO(iPriorytetRepository.save(pPriorytetOB));
    }

    @Override
    public void deletePriorytet(Long aId) {
        iPriorytetRepository.delete(aId);
    }
}
